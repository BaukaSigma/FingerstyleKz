-- Add original_price_kzt column to tabs table
alter table "public"."tabs"
add column "original_price_kzt" integer null;
