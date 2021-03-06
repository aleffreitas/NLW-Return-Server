import { MailAdapter } from "../adapters/mail.adapter";
import { FeedbackRepository } from "../repositories/feedbacksRepository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbackRepository,
    private maildAdapter: MailAdapter,
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest){
    const { type, comment, screenshot } = request;

    if(!type){
      throw new Error('Type is required');
    }

    if(!comment){
      throw new Error('Comment is required');
    }

    if(screenshot && !screenshot.startsWith('data:image/png;base64,')){
      throw new Error('Invalid screenshot format.');
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot 
    });

    await this.maildAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        `<img src="${screenshot}" />`,
        `</div>`,
      ].join('\n')
    })
  }
}