export interface AuthenticatedUserTypes {
  email: string;
  userId: number;
  username: string;
  roles: string[];
  administrator: boolean;
  /**
   * The user's full name from their profile, as one free-text field.
   *
   * Null for accounts with no profile row — service users, in practice — and
   * absent altogether from a token minted without the `profile` scope, which is
   * what the LMS attaches this claim to. Optional as well as nullable for that
   * reason, even though the session cookie normally carries it.
   */
  name?: string | null;
}

export interface ConfigTypes {
  [key: string]: string | boolean | number | Record<string, any>;
}

export interface AppContextTypes {
  authenticatedUser: AuthenticatedUserTypes | null;
  config: ConfigTypes;
}

export interface MenuItem {
  type: 'item';
  href: string;
  content: string;
  isActive?: boolean;
}
