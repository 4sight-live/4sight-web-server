
  create policy "Enable all on test for everyone"
  on "4sight_web_server"."test"
  as permissive
  for all
  to public
using (true)
with check (true);



