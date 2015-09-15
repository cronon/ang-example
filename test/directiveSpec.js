describe("directive", function() {
  beforeEach(module("myApp"))
  beforeEach(module('my.templates'))
  beforeEach(module(function($provide){
    $provide.factory('colorService', function(){
      return {
        colors: 'yellow'.split(' '),
        get: function(onSuccess){ 
          onSuccess('yellow', {origin: '1.1.1.1'})
        }
      }
    })
  }))
  var element, scope, b, ul, h1, colorService;
  beforeEach(inject(function($rootScope, $compile, _colorService_){
    scope = $rootScope.$new()
    element = "<div class='colorsButton' origin='7.7.7.7' color='fuchsia'></div>"
    element = $compile(element)(scope)
    scope.$digest()
    b = element.find('button')
    h1 = element.find('button').find('h1')
    ul = element.find('ul')
    colorService = _colorService_
  }))

  it("has button", () => {
    expect(b.length).toEqual(1)
  })
  it("has h1", () => {
    expect(h1.length).toEqual(1)
  })
  it("has ul", () => {
    expect(ul.length).toEqual(1)
  })

  it('renders origin', () => {
    expect(h1.text().trim()).toEqual('7.7.7.7')
  })

  it('renders color', ()=> {
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

  it('calls to colorService on button click', () => {
    b[0].click()
    expect(colorService.colors).toEqual(['yellow'])
    scope.$digest()
    expect(h1[0].classList).toContain('yellow')
    expect(b.text().trim()).toEqual('1.1.1.1')
  })
})