/** @jest-environment node */
// The final exam emails every submission to the instructor through Resend.

import type { NextRequest } from 'next/server';

const mockSend = jest.fn();
jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({ emails: { send: mockSend } })),
}));

import { POST } from '@/app/api/send-exam-results/route';

const PAYLOAD = {
  examTitle: 'Grammar Review Final Exam',
  studentName: 'Ruth <script>',
  studentEmail: '',
  grammarScore: 30,
  grammarTotal: 40,
  vocabScore: 31,
  vocabTotal: 40,
  translationScore: 12.3,
  translationTotal: 20,
  mcqAnswers: [{
    sectionId: 1,
    questions: [{ questionId: 'c13-g01', question: 'Parse:', options: ['a', 'b'], correctIndex: 0, studentAnswer: 1, isCorrect: false }],
  }],
  translationAnswers: [{
    questionId: 'c13-va01',
    reference: 'Genesis 1:1',
    hebrew: 'בְּרֵאשִׁית בָּרָא',
    referenceTranslation: 'In the beginning he created',
    studentTranslation: 'In the beginning',
    matchingPairs: [{ hebrew: 'בָּרָא', correctCategory: 'Qal Perfect 3ms', studentCategory: '' }],
  }],
  completedAt: '27/09/2026, 10:00:00',
};

const post = (body: unknown) =>
  POST(new Request('http://localhost/api/send-exam-results', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  }) as unknown as NextRequest);

beforeEach(() => {
  mockSend.mockReset();
  process.env.RESEND_API_KEY = 'test-key';
});

describe('POST /api/send-exam-results', () => {
  it('should email the instructor the scores, the answers and the Hebrew', async () => {
    mockSend.mockResolvedValue({ data: { id: 'email-1' }, error: null });
    const res = await post(PAYLOAD);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true, emailId: 'email-1' });
    const email = mockSend.mock.calls[0][0];
    expect(email.to).toBe('keratinqw@gmail.com');
    expect(email.from).toMatch(/Hebrew/);
    expect(email.subject).toBe('Grammar Review Final Exam: Ruth <script> — 73%');
    expect(email.html).toContain('בְּרֵאשִׁית בָּרָא');
    expect(email.html).toContain('73.3 / 100');
    expect(email.html).toContain('Ruth &lt;script&gt;');
    expect(email.html).not.toContain('<script>');
  });

  it('should refuse a payload with no student name', async () => {
    expect((await post({ ...PAYLOAD, studentName: undefined })).status).toBe(400);
    expect((await post('not json')).status).toBe(400);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it('should report failure when the email key is missing', async () => {
    delete process.env.RESEND_API_KEY;
    const res = await post(PAYLOAD);
    expect(res.status).toBe(500);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it('should report failure when Resend rejects the email', async () => {
    mockSend.mockResolvedValue({ data: null, error: { message: 'domain not verified' } });
    const res = await post(PAYLOAD);
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: 'domain not verified' });
  });
});
