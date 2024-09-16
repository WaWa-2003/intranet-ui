export interface SystemCardData {
    id: number;
    title: string;
    image: string;
    description: string;
    status: boolean; 
    weblink: string; 
}

export const systemData: SystemCardData[] = [
    {
        id: 1,
        title: "OT Request System",
        image: "/../images/ot-logo.png",
        description: "Manage overtime requests efficiently.",
        status: true, 
        weblink: 'https://apps.powerapps.com/play/e/default-b8c84464-86e7-4d3a-8c4d-d5b1acce5b88/a/8d46995c-9848-46a9-9375-871abb517c04', 
    }, 
    {
        id: 2,
        title: "Outside Request & Reimbursement System",
        image: "/../images/orr-logo.png",
        description: "Handle external requests and reimbursements.",
        status: true, 
        weblink: "https://apps.powerapps.com/play/e/default-b8c84464-86e7-4d3a-8c4d-d5b1acce5b88/a/6ffec840-44c7-4ff8-94c2-6533d8eea02b?tenantId=b8c84464-86e7-4d3a-8c4d-d5b1acce5b88&hint=7063853e-2ce6-42d6-b883-b75aa401f1d3&sourcetime=1723800595420", 
    },
    {
        id: 3,
        title: "RapidStart CRM",
        image: "/../images/rs-crm-logo.png",
        description: "Track and manage maintenance tasks.",
        status: true, 
        weblink: "https://xenoptics.crm6.dynamics.com/main.aspx?appid=7e22bc49-af94-ee11-be37-000d3aca6cb5", 
    },
    {
        id: 4,
        title: "Ship Rush",
        image: "/../images/docu-control-logo.png",
        description: "Manage the products shipping efficiently.",
        status: true, 
        weblink: "https://my.shiprush.com/Ship/Ship?shipSessionId=hvh5k4yd5k6FfAV6hnR1EA#shipmentgrid/pending", 
    },
    {
        id: 5,
        title: "Maintenance System",
        image: "/../images/maintenance-logo.png",
        description: "Handle external requests and reimbursements.",
        status: true, 
        weblink: "https://xenons.sharepoint.com/SitePages/HR-Training-Forms-Link.aspx", 
    },
    {
        id: 6,
        title: "xendb",
        image: "/../images/maintenance-logo.png",
        description: "Track and manage maintenance tasks.",
        status: true, 
        weblink: "https://xendb/", 
    },
    {
        id: 7,
        title: "Document Control System", 
        image: "/../images/maintenance-logo.png",
        description: "Track and manage maintenance tasks.",
        status: true, 
        weblink: "https://forms.office.com/pages/responsepage.aspx?id=ZETIuOeGOk2MTdWxrM5biO-DvagkD4tPqliccLY3HWVUNjhUUUdRV0IwUTJINzI5UkZOVEUwMjZIWSQlQCN0PWcu", 
    },
    {
        id: 8,
        title: "HR Training Forms", 
        image: "/../images/maintenance-logo.png",
        description: "Track and manage maintenance tasks.",
        status: true, 
        weblink: "https://forms.office.com/pages/responsepage.aspx?id=ZETIuOeGOk2MTdWxrM5biO-DvagkD4tPqliccLY3HWVUNjhUUUdRV0IwUTJINzI5UkZOVEUwMjZIWSQlQCN0PWcu", 
    },
];

