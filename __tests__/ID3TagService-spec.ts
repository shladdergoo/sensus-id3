describe('basic tests', () => {

  test("should succeed in this case", () => {
    expect(1).toBeTruthy();
  });

  //it aliases test
  it("should also succeed in this case", () => {
    expect(false).not.toBeTruthy();
  });
});
