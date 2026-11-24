import test from 'node:test';
import assert from 'node:assert/strict';
import { crossedParkingDoor, FRONT_LIMIT, parkingDoors, parkingUrl, arrivalDoor } from '../hq1-doorway.mjs';

for (const door of parkingDoors) {
  test(door.id+' exit works at slow and fast movement increments', () => {
    for (const delta of [.001,.008,.016,.07,.21]) {
      assert.equal(crossedParkingDoor(door.x,FRONT_LIMIT,door.x,FRONT_LIMIT+delta)?.id,door.id);
      assert.equal(crossedParkingDoor(door.x,FRONT_LIMIT-delta/2,door.x,FRONT_LIMIT+delta/2)?.id,door.id);
    }
    assert.equal(crossedParkingDoor(door.x+1.2,6.49,door.x+1.2,6.51),null);
    assert.equal(crossedParkingDoor(door.x,6.49,door.x,6.495),null);
    assert.equal(crossedParkingDoor(door.x,6.5,door.x,6.49),null);
    const url=new URL(parkingUrl(door.id));
    assert.equal(url.origin,'https://1age.space');
    assert.equal(url.searchParams.get('return'),'hq1-northleftchef');
    assert.equal(url.searchParams.get('door'),door.id);
    assert.equal(arrivalDoor('?from=hq1&venue=hq1-northleftchef&door='+door.id)?.id,door.id);
  });
}
test('diagonal crossing uses the intersection with the wall rather than the end point',()=>{
  assert.equal(crossedParkingDoor(-8.6,6.4,-7.5,6.6)?.id,'cafe');
  assert.equal(crossedParkingDoor(0,6.4,0,6.6),null);
  assert.equal(crossedParkingDoor(NaN,6.4,0,6.6),null);
});
