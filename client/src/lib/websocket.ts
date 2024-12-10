import { ChatMessage } from './mock-data';

class MockWebSocket {
  private callbacks: ((message: ChatMessage) => void)[] = [];
  private interval: NodeJS.Timeout | null = null;

  constructor() {
    this.startMockMessages();
  }

  onMessage(callback: (message: ChatMessage) => void) {
    this.callbacks.push(callback);
  }

  private startMockMessages() {
    const users = ['xQc', 'Ninja', 'pokimane', 'shroud', 'TimTheTatman'];
    const messages = [
      'PogChamp Amazing play!',
      'LUL that was funny',
      'Kappa sure buddy',
      'GG',
      'Let\'s go!'
    ];
    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FF00FF', '#FFFF00'];

    this.interval = setInterval(() => {
      const message: ChatMessage = {
        id: Math.random().toString(36),
        user: users[Math.floor(Math.random() * users.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
        timestamp: new Date(),
        color: colors[Math.floor(Math.random() * colors.length)]
      };

      this.callbacks.forEach(callback => callback(message));
    }, 2000);
  }

  close() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}

export const createMockWebSocket = () => new MockWebSocket();
