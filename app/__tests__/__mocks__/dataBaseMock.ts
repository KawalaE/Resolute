import { Issue } from "@prisma/client";

export const data: Issue[] = [
  {
    id: 0,
    title: "Issue1",
    description:
      "**Dashboard** experiences high latency when pulling real-time data",
    status: "OPEN",
    priority: "HIGH",
    createdAt: new Date("2023-03-02T00:00:00.000Z"),
    updatedAt: new Date("2024-09-27T09:48:46.740Z"),
    assignedToUserId: null,
  },
  {
    id: 1,
    title: "Issue 2",
    description:
      "Users are unexpectedly logged out after a few minutes of inactivity",
    status: "CLOSED",
    priority: "LOW",
    createdAt: new Date("2023-03-01T00:00:00.000Z"),
    updatedAt: new Date("2024-09-24T11:30:27.022Z"),
    assignedToUserId: null,
  },
];