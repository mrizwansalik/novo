import { sendInvite } from "../../../../api/worker";

export async function sendInvites(userIds: string[]): Promise<void> {
  if (!Array.isArray(userIds)) throw new Error("User ids is not valid");
  await Promise.all(userIds.map((userId: string) => sendInvite(userId)));
}
