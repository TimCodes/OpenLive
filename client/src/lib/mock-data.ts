export interface Stream {
  id: string;
  title: string;
  streamer: string;
  game: string;
  viewers: number;
  thumbnailUrl: string;
  avatarUrl: string;
}

export interface Category {
  id: string;
  name: string;
  viewers: number;
  thumbnailUrl: string;
}

export const mockStreams: Stream[] = [
  {
    id: '1',
    title: 'Just Chatting with viewers!',
    streamer: 'pokimane',
    game: 'Just Chatting',
    viewers: 45000,
    thumbnailUrl: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_pokimane-440x248.jpg',
    avatarUrl: 'https://static-cdn.jtvnw.net/jtv_user_pictures/pokimane-profile_image-5187ec57a9b91d87-70x70.jpeg'
  },
  {
    id: '2',
    title: 'VALORANT Ranked Grind',
    streamer: 'shroud',
    game: 'VALORANT',
    viewers: 32000,
    thumbnailUrl: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_shroud-440x248.jpg',
    avatarUrl: 'https://static-cdn.jtvnw.net/jtv_user_pictures/shroud-profile_image-5390f33fbb31f741-70x70.jpeg'
  },
  {
    id: '3',
    title: 'League of Legends Worlds 2024',
    streamer: 'riotgames',
    game: 'League of Legends',
    viewers: 125000,
    thumbnailUrl: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_riotgames-440x248.jpg',
    avatarUrl: 'https://static-cdn.jtvnw.net/jtv_user_pictures/riotgames-profile_image-4a31f094f571e151-70x70.jpeg'
  },
  {
    id: '4',
    title: 'CS2 Pro Matches',
    streamer: 'esl_csgo',
    game: 'Counter-Strike 2',
    viewers: 85000,
    thumbnailUrl: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_esl_csgo-440x248.jpg',
    avatarUrl: 'https://static-cdn.jtvnw.net/jtv_user_pictures/esl_csgo-profile_image-49a146ab42e92a87-70x70.jpeg'
  }
];

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Just Chatting',
    viewers: 450000,
    thumbnailUrl: 'https://images.unsplash.com/photo-1499612657035-beb4431a3cdb'
  },
  {
    id: '2',
    name: 'VALORANT',
    viewers: 250000,
    thumbnailUrl: 'https://images.unsplash.com/photo-1558008258-3256797b43f3'
  },
  // Add more categories...
];

export interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: Date;
  color: string;
}

export const mockEmotes = {
  'Kappa': '😏',
  'PogChamp': '😲',
  'LUL': '😂',
  'OMEGALUL': '🤣',
  'Jebaited': '😜',
  'monkaS': '😰',
  'KEKW': '😆',
  'HeyGuys': '👋',
  'BibleThump': '😢',
  'ResidentSleeper': '😴',
  'TriHard': '😤',
  'VoHiYo': '😊',
  'WutFace': '😱',
  'FrankerZ': '🐶'
};
