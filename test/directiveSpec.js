describe("directive", function() {
  beforeEach(module("myApp"))
  beforeEach(module('my.templates'))
  var element, scope;
  beforeEach(inject(function($rootScope, $compile){
    scope = $rootScope.$new()
    element = "<div class='colorsButton' origin='7.7.7.7' color='fuchsia'></div>"
    element = $compile(element)(scope)
    scope.$digest()
  }))
  it("has button", () => {
    var b = element.find('button')
    expect(b.length).toEqual(1)
  })
  it("has h1", () => {
    var h1 = element.find('button').find('h1')
    expect(h1.length).toEqual(1)
  })
  it("has ul", () => {
    var ul = element.find('ul')
    expect(ul.length).toEqual(1)
  })

  it('renders origin', () => {
    var h1 = element.find('button')
    expect(h1.text().trim()).toEqual('7.7.7.7')
  })

  it('renders color', ()=> {
    var h1 = element.find('h1')
    expect(h1.hasClass('fuchsia')).toEqual(true)
  })

  it('renders list of colors', () => {
    var list = 'red green blue'.split(' ')
    scope.$apply(() => {
      scope.colors = list
    })
    var lis = [].slice.apply(element.find('li'))
    expect(lis.length).toEqual(3)
    var colors = lis.map(li => li.innerHTML.trim())
    expect(colors).toEqual(list)
  })

  it('calls to colorsService on button click', () => {
    var b = element.find('button')
    b[0].click()
    expect(b.text().trim()).not.toEqual('7.7.7.7')
  })
})