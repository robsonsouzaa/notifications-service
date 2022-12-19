import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notification-repository';

interface CountRecipientNotificationRequest {
  recipientId: string;
}

interface CountRecipientNotificationResonse {
  count: number;
}

@Injectable()
export class CountRecipientNotifications {
  constructor(private noitificationsRepository: NotificationsRepository) {}

  async execute(
    request: CountRecipientNotificationRequest,
  ): Promise<CountRecipientNotificationResonse> {
    const { recipientId } = request;

    const count = await this.noitificationsRepository.countManyByRecipientId(
      recipientId,
    );

    return {
      count,
    };
  }
}
