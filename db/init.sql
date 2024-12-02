create type exchange as enum ('Binance');

create table historical_data (
    id uuid primary key,
    ticker text not null,
    exchange exchange not null,
    open_time bigint not null,
    open numeric not null,
    high numeric not null,
    low numeric not null,
    close numeric not null,
    volume numeric not null
);
