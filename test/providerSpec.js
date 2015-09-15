describe("catServiceProvider", function(){
  beforeEach(module('myApp'))
  var catServiceProvider, catService
  beforeEach(module(function(_catServiceProvider_){
    catServiceProvider = _catServiceProvider_
  }))
  beforeEach(inject(function(_catService_){
    catService = _catService_
  }))
  it("has type setter", () => {
    expect(catServiceProvider.setType).toBeDefined()
  })
  it("changes type of request", () => {
    catServiceProvider.setType('tiff')
    var link = catServiceProvider.$get().get()
    var actual = link.slice(link.length - 4)
    expect(actual).toEqual('tiff')
  })  
})