import prisma from "./prisma";

export async function getWines() {
  try {
    const wines = await prisma.wine.findMany({
      include: { bottle: true },
      orderBy: { id: "asc" },
    });
    return { wines };
  } catch (error) {
    return { error };
  }
}
