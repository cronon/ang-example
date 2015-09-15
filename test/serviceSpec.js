describe("colorService", function() {
  beforeEach(function(){
    jasmine.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(module("myApp"))

  var colorService, $httpBackend
  beforeEach(function(){
    inject(function($injector, _$httpBackend_){
      $httpBackend = _$httpBackend_
      $httpBackend.expectGET("//httpbin.org/ip")
        .respond({origin: "7.7.7.7"})
      colorService = $injector.get("colorService", $httpBackend)
    })
  })

  it("works", () => {
    expect(1).toEqual(1)
  })
  
  it("has colors", () => {
    var colors = "red green blue yellow".split(' ')
    expect(angular.equals(colorService.colors, colors)).toBe(true)
  })

  it("makes call to httpbin", () => {
    colorService.get((color, data) => {})
    $httpBackend.flush()
  })

  it("respond with color and ip", () => {
    colorService.get((color, data) => {
      expect(data.origin).toMatch(/7\.7\.7\.7:\d{1,5}/)
      expect(colorService.colors).toContain(color)
    })
    $httpBackend.flush()
  })
})