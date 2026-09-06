export type CommunityMenuKey =
  | 'newsfeed'
  | 'events'
  | 'smallGroups'
  | 'prayer'
  | 'ministry'
  | 'videos';

export type CommunityMenuItem = {
  key: CommunityMenuKey;
  label: string;
  description: string;
};

const MENU: CommunityMenuItem[] = [
  { key: 'newsfeed', label: 'Newsfeed', description: 'Latest posts from the church' },
  { key: 'events', label: 'Events', description: 'Upcoming services and gatherings' },
  { key: 'smallGroups', label: 'Small Groups', description: 'Find a group near you' },
  { key: 'prayer', label: 'Prayer Requests', description: 'Share and pray together' },
  { key: 'ministry', label: 'Ministry', description: 'Serve with a ministry team' },
  { key: 'videos', label: 'Videos', description: 'Sermons and worship recordings' },
];

export function getCommunityMenu(): CommunityMenuItem[] {
  return MENU;
}
