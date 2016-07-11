describe('LearnJS', function() {
  it('shows the landing page view when there is no hash', function() {
    learnjs.showView('');
    expect($('.view-container .landing-view').length).toEqual(1);
  });
  it('invokes the router when loaded', function() {
    spyOn(learnjs, 'showView');
    learnjs.appOnReady();
    expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
  });
  it('subscribes to the hash change event', function() {
    learnjs.appOnReady();
    spyOn(learnjs, 'showView');
    $(window).trigger('hashchange');
    expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
  });
  it('can show a problem view', function() {
    learnjs.showView('#problem-1');
    expect($('.view-container .problem-view').length).toEqual(1);
  });
  describe('problem view', function() {
    it('passes the hash view parameter to the view function', function() {
      spyOn(learnjs, 'problemView');
      learnjs.showView('#problem-42');
      expect(learnjs.problemView).toHaveBeenCalledWith('42');
    });
    it('has a title that includes the problem number', function() {
      var view = learnjs.problemView('1');
      expect(view.find('h3').text().trim()).toEqual('Problem #1');
    });
    it('binds a data value to an element', function() {
      var view = learnjs.problemView('1');
      var bind = learnjs.applyObject(learnjs.problems[0], view);
      expect(view.find('p').text().trim()).toEqual('What is truth?');
      expect(view.find('code').text().trim()).toEqual('function problem() { return __; }');
    });
  });
});
