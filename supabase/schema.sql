create table if not exists public.reservas_aip (
  id uuid primary key default gen_random_uuid(),
  docente text not null,
  curso text,
  aula text,
  fecha date not null,
  hora_inicio time not null,
  hora_fin time not null,
  motivo text,
  estado text default 'pendiente',
  created_at timestamp with time zone default now()
);

alter table public.reservas_aip enable row level security;

create policy "Permitir crear reservas AIP"
on public.reservas_aip
for insert
to anon
with check (true);
