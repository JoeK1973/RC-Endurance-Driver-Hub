create extension if not exists "pgcrypto";
create table if not exists drivers(id uuid primary key default gen_random_uuid(),name text not null,email text unique not null,club text,experience text,classes text[] default '{}',status text not null default 'looking',notes text,created_at timestamptz default now());
create table if not exists rounds(id text primary key,name text not null,event_date date);
create table if not exists driver_availability(driver_id uuid references drivers(id) on delete cascade,round_id text references rounds(id) on delete cascade,primary key(driver_id,round_id));
create table if not exists teams(id uuid primary key default gen_random_uuid(),name text not null,manager_id uuid);
create table if not exists shortlists(team_id uuid references teams(id) on delete cascade,driver_id uuid references drivers(id) on delete cascade,round_id text references rounds(id) on delete cascade,primary key(team_id,driver_id,round_id));
alter table drivers enable row level security; alter table rounds enable row level security; alter table driver_availability enable row level security;
create policy "public rounds" on rounds for select using(true);
create policy "public open drivers" on drivers for select using(status in ('looking','reserve'));