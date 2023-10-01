import prisma from "./prisma";

export async function getWines() {
  try {
    const wines = await prisma.wine.findMany({
      include: { bottle: true },
    });
    return { wines };
  } catch (error) {
    return { error };
  }
}
