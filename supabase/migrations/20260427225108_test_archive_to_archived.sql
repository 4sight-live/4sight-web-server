alter table "4sight_web_server"."test" drop column "archive";

alter table "4sight_web_server"."test" add column "archived" boolean not null default false;


