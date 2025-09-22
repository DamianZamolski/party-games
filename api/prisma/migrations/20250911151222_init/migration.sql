-- CreateTable
CREATE TABLE "public"."room" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "room_pkey" PRIMARY KEY ("id")
);
