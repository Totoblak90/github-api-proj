export interface GithubCommitFullResponse {
    sha:          string;
    node_id:      string;
    commit:       Commit;
    url:          string;
    html_url:     string;
    comments_url: string;
    author:       Author;
    committer:    Author;
    parents:      Array<null[]>;
}

export interface Author {
    login:               string;
    id:                  number;
    node_id:             string;
    avatar_url:          string;
    gravatar_id:         string;
    url:                 string;
    html_url:            string;
    followers_url:       string;
    following_url:       string;
    gists_url:           string;
    starred_url:         string;
    subscriptions_url:   string;
    organizations_url:   string;
    repos_url:           string;
    events_url:          string;
    received_events_url: string;
    type:                string;
    site_admin:          boolean;
}

export interface Commit {
    author:        null[];
    committer:     null[];
    message:       string;
    tree:          null[];
    url:           string;
    comment_count: number;
    verification:  null[];
}