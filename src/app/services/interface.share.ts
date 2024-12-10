export interface user {
    id?: string;
    name: string;
    email: string;
  }

export interface profile {
    ProfileId?: string;
    ProfileName: string;
    RuleName: string;
  }
export interface rule {
    RuleId?: string;
    Condition?: string;
    RuleName: string;
    Value: string;
    ischecked?: boolean;
}

export enum actions {
    INITIAL = 'initial',
    ADD = 'add',
    UPDATE = 'update',
    DELETE = 'delete'
}

export enum successMessage {
    USER_ADDED = 'user added successfully',
    USER_UPDATED = 'user updated successfully',
    USER_DELETED = 'user deleted successfully',
    RULE_ADDED = 'rule created successfully!',
    RULE_DELETED = 'rule deleted successfully!',
    RULE_UPDATED = 'rule updated successfully!',
    PROFILE_ADDED = 'profile created successfully',
    PROFILE_DELETED = 'profile deleted successfully',
    PROFILE_UPDATED = 'profile updated successfully',
    DATASOURCE_ADDED = 'datasource parameter added successfully!',
    DATASOURCE_DELETED = 'datasource parameter deleted successfully',
    DATASOURCE_UPDATED= 'datasource parameter updated successfully',
}

export type SortColumn = keyof string | '';
export type SortDirection = 'asc' | 'desc' | '';

