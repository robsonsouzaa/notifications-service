import { makeNotification } from '@test/factories/notification-factory';
import { InMemoriNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { UnreadNotification } from './unread-noitification';

describe('Unread notification', () => {
  it('shoud be able to unread a notification', async () => {
    const notificationsRepository = new InMemoriNotificationsRepository();
    const unreadNotitification = new UnreadNotification(
      notificationsRepository,
    );

    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationsRepository.create(notification);

    await unreadNotitification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to cancel a non existing notification', async () => {
    const notificationsRepository = new InMemoriNotificationsRepository();
    const unreadNotitification = new UnreadNotification(
      notificationsRepository,
    );

    expect(() => {
      return unreadNotitification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
