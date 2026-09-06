export type GivingFundKey = 'tithe' | 'offering' | 'mission' | 'building';

export type GivingFund = {
  key: GivingFundKey;
  label: string;
  description: string;
};

export type GivingAccount = {
  bank: string;
  accountNumber: string;
  accountName: string;
};

const FUNDS: GivingFund[] = [
  { key: 'tithe', label: 'Tithe', description: 'Regular tithe to the church' },
  { key: 'offering', label: 'Offering', description: 'Thanksgiving and special offering' },
  { key: 'mission', label: 'Mission', description: 'Support outreach and mission work' },
  { key: 'building', label: 'Building Fund', description: 'Support church facilities' },
];

const ACCOUNTS: GivingAccount[] = [
  { bank: 'BCA', accountNumber: '123 456 7890', accountName: 'Gereja KIMA' },
  { bank: 'Mandiri', accountNumber: '098 765 4321', accountName: 'Gereja KIMA' },
];

export function getGivingFunds(): GivingFund[] {
  return FUNDS;
}

export function getGivingAccounts(): GivingAccount[] {
  return ACCOUNTS;
}

export function formatAmount(value: number): string {
  return `Rp ${value.toLocaleString('id-ID')}`;
}
