import { Notification } from '@application/entities/notification';
import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notification-repository';

interface GetRecipientNotificationsRequest {
  recipientId: string;
}

interface GetRecipientNotificationsResonse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotifications {
  constructor(private noitificationsRepository: NotificationsRepository) {}

  async execute(
    request: GetRecipientNotificationsRequest,
  ): Promise<GetRecipientNotificationsResonse> {
    const { recipientId } = request;

    const notifications =
      await this.noitificationsRepository.findManyByRecipientId(recipientId);

    return {
      notifications,
    };
  }
}
