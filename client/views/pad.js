var pad;
var remotePad;

Meteor.startup(function() {
  Deps.autorun(function() {
    if(pad) {
      pad.close();
      remotePad.close();
    }

    var padId = Session.get('padId');
    pad = new Pad(padId);
    remotePad = new RemotePad(padId, pad);
  });
});

$(function() {
  $('body').on('click', '#wipe', function() {
    pad.wipe(true);
  });

  $('body').on('click', '#set-nickname', function() {
    var name = prompt('Enter your nickname');
    if(name && name.trim() != '') {
      pad.setNickname(name);
    }
  });

  $('body').on('click', '#create-new', function() {
    var newPadId = Random.id();
    Meteor.Router.to('pad', newPadId);
  });

  $('body').on('click', '#save-image', function() {
  	var c=document.getElementById("alpha");
	var d=c.toDataURL("image/png");
	var w=window.open('about:blank','image from canvas');
	w.document.write("<h4>Save with Right then Save As </h4> <img src='"+d+"' alt='from canvas'/>");
  });
});
