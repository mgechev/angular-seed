// export  class static ConsantValueComponent {
//    public static get API_ENDPOINT(): string { return 'http://127.0.0.1:6666/api/'; }
// }

export class RRFStatus {
    public static get PendingApproval(): number { return 1; };
    public static get Open(): number { return 2; };
    public static get Rejected(): number { return 3; };
    public static get Assigned(): number { return 4; };
    public static get Closed(): number { return 5; };
    public static get Declined(): number { return 6; };
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

export class RRFAssignStatus {
    public static get Assigned(): number { return 1; };
    public static get UnAssigned(): number { return 2; };
}

export class RaiseRRFStatus {
    public static get newRRF(): number { return 1; }; //New RRF
    public static get updateRRF(): number { return 2; }; //update RRF beforw Approve it
    public static get UpdateRejectedRRF(): number { return 3; }; //Update RRF because it is rejected
    public static get UpdateForFeedback(): number { return 4; }; //Update RRF because Recruiter head need feedback
}
export class InterviewMode {
    public static get FaceToFace(): number { return 1; };
    public static get SkypeInterview(): number { return 3; };
    public static get VideoConferency(): number { return 4; };
}

