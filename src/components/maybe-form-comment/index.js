export default function MaybeFormComment({
  isSessionExists,
  activeParentId,
  ownId,
  notMatchIdComponent,
  noSessionComponent,
  yesAllComponent,
}) {
  if (ownId !== activeParentId) return notMatchIdComponent;
  if (!isSessionExists) return noSessionComponent;
  return yesAllComponent;
}
