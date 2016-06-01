// export  class static ConsantValueComponent {
//    public static get API_ENDPOINT(): string { return 'http://127.0.0.1:6666/api/'; }
// }

export class RRFStatus {
    public static get PendingApproval(): number { return 1; };
    public static get Rejected(): number { return 2; };
    public static get Open(): number { return 3; };
    public static get Assigned(): number { return 4; };
    public static get InProgress(): number { return 5; };
    public static get ClosureApproval(): number { return 6; };
    public static get Closed(): number { return 7; };
}

export class APIResult {
    public static get Success(): number { return 1; };
    public static get Error(): number { return 2; };
}

export class CandidateStatus {
    public static get Open(): number { return 1; };
    public static get PendingScreening(): number { return 2; };
    public static get Offered(): number { return 3; };
    public static get Selected(): number { return 4; };
    public static get Blacklisted(): number { return 5; };
}

export class RRFPriority {
    public static get One(): number { return 1; };
    public static get Two(): number { return 2; };
    public static get Three(): number { return 3; };
    public static get Four(): number { return 4; };
    public static get Five(): number { return 5; };
}

