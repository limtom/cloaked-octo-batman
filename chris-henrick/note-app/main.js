// app is what we will call a "module".
// it is a Global variable. And an Object.
// app is equal to an Immediately Invoked Function Expression.
// That is why the function is wrapped in parentheses like this:
/*
	var myObject = (function() {
	
		return {
			foo : bar,
			peanut : butter
		};

	})();

	now, in this example myObject is equal to:

	var myObject = {foo: bar, peanut: butter}
	The reason we use this technic is that it allows us to have "private"
	and "public" members. 

	In the example below, all the "var"s are hidden from the world outside.
	ONLY those that are "returned" at the end are visible when you type in your console "app".

*/ 
var app = (function(w, d) { // scroll down and see how we are passind "window" and "document" to this function. we are creating two "alias" names for them here: "w" and "d"

	// We are "caching" all the HTML elements we will be using in out app and keeping the nice and tidy inside a DOM object.
	// Everytime we query the page for an element, we are performing an expensive operation.
	// Because out browser has to traverse thgough all the HTML nodes every single time to find the element
	// we need. So we save a reference to them once. In large apps, this will result in significant increase in speed.
	var DOM = {
		'write-note-form' : d.querySelector('.write-note-form'), // document.queryselector('selector') (notice how instead of "document" we are using our alias "d").
		'write-note' : d.querySelector('.write-note'), // document.queryselector('selector') allows us to select element on out HTML page by their class, name, or ID. 
		'submit-note' :  d.querySelector('.submit-note'),
		'notes' : d.querySelector('.notes')
	};

	// A function that removes whitespaces from the beginning and end of out form input.
	// Here we are using Regular Expressions. We have not covered it yet.
	var sanitize = function(string) {
		return string.replace(/(^\s+|\s+$)/g,'');
	};

	// a variable for a unique identifier for each note
	// ended up not needing this to solve the remove() function
	var id = 0;

	// A function in which we can put all our events handlers.
	// Event handlers are functions that "listen" for an event, like "click" or "scroll"
	// And "handlers" are functions that do something everytime an "event" happens, or, "fires".
	// here, we are telling out submit button to "listen" for "clicks" and does the following:
	var attachEvents = function() {
		DOM['submit-note'].addEventListener('click', function(e) {
			e.preventDefault();
			// cancel its default behavior (don't submit the form. Because form submission will refresh our page)
			notes.push(new Note(id+=1, sanitize(DOM['write-note'].value), DOM['notes']).init());
			// make a new Note object and push it to "notes" array.
			DOM['write-note'].value = '';
			// empty the form text field.

			var n = 0,
				len = notes.length;
			// for (n; n<len; n++){
			// 	//console.log('n: ', n);
			// 	console.log('notes[n]: ', notes[n].id);
			// }
		});
	};

	// Note is what we refer to as a "constructor".
	// It is a "blueprint" for creating similar objects. Here, 
	// We are making a blueprint for making "note" objects.
	// We allways, by convention, capitalize the name of our "constructors".
	// we use constructors like this:
	// var myNote = new Note('some text for the note', 'the list to which the note should append itself into.');
	// here, the second parameter we pass to the Note constructor is an HTML element 
	// Take a look at the html. We have a <ul></ul> element that keeps all the notes. We pass that as an argument to the constructor.
	// every object created using new Note(); syntax will have:
	var Note = function(id, text, list) {
		// add the note as a list item containing a <p> for text and <ul> for like & delete buttons
		this.id = id; // unique identifier
		this.text = text; // body text
		this.list = list; // a list to append itself into
		this.listItem = d.createElement('li'); // a list item. we can create HTML elements using document.createElement(nameOfElement);
		this.title = d.createElement('h1'); // title for the note
		this.dateTime = d.createElement('h3'); // date the note was created
		this.paragraph = d.createElement('p'); // a paragraph element to hold the text
		this.actions = d.createElement('ul'); // a <ul> element to hold the "like" and "remove" buttons.
		this.likeButton = d.createElement('li'); // an <li> button for like buttons
		this.removeButton = d.createElement('li'); // an <li> for remove buttons
		this.liked = false; // a boolean that is set to false by default. It indicates whether our post has been liked or not. 
		
		var now = new Date().format("M/d/20y h:m");
		this.noteTime = d.createElement('h3');
		this.noteTime.innerHTML
		// var that = this; please blindly accept this from me now. 
		// I will explain why we do this. 
		var that = this; // We will use this var in like(); and remove(); method. 
		// this is the like function.
		this.like = function() {
			/* 	NOTE: in the context of this function
				whenever you need to call a method or property
				from Note(); scope, instead of calling: "this.liked", use "that.liked"
				Will explain this in class Thursday
			 */

			 /* HOMEWORK: */
			
			// implement the method logic.
			// This method should:
			// 1 - Toggle the class ".liked" to the like button.
			// 2 - Toggle the "liked" boolean.
			// if (that.liked === false){
			// 	that.likeButton.className += " liked";								
			// 	that.liked = true;
			// } else if (that.liked === true) {
			// 	that.likeButton.className = "like icon-heart";
			// 	that.liked = false;
			// } 
			/* simpler way of doing the above ^*/
			that.liked = !that.liked;
			that.likeButton.classList.toggle('liked');
		};
		this.remove = function() {
			/* 	NOTE: in the context of this function
				whenever you need to call a method or property
				from Note(); scope, instead of calling: "this.liked", use "that.liked"
				Will explain this in class Thursday
			 */

			console.log(that.id);
			


			/* HOMEWORK: */

			// implement the method logic.
			// This method should:
			// 1 - Delete the note from the screen
			// 2 - Delete the note from the "notes" array
			// var i = 0;
			// 	//len = notes.length;
			// for (i; i<notes.length; i++){
			// 	console.log(notes[i]);

			// 	if (that === notes[i]){
			// 		notes.splice(notes[i],1);

			// 		console.log('match!');
			// 		console.log('notes[i]: ', notes[i]);
			// 	}
			// }
			notes.splice(notes.indexOf(that),1);
			DOM.notes.removeChild(that.listItem);

			// that.listItem.removeChild(that.paragraph);
			// that.listItem.removeChild(that.actions);
			// that.list.removeChild(that.listItem);

		};

		this.attachEvents = function() {
			// every note object also has an "attach events" function
			// that takes care of handling all the events (like the one we had at the top)
			this.likeButton.addEventListener('click', function() {
				/* HOMEWORK */
				// Call the like method here.
				that.like();
			});
			this.removeButton.addEventListener('click', function() {
				/* HOMEWORK */
				// Call the remove method here.
				that.remove();
			});
		};

		// init function initialized every note.
		// this is where we put everything we have to do,
		// to get make the new note appear on screen.
		this.init = function() {
			this.listItem.className += 'note'; // add the class 'note' to out note <li> element
			this.dateTime = this.noteTime;
			this.paragraph.innerHTML = this.text; // take the text we got from the form and put it in this note's paragraph.
			this.listItem.appendChild(this.paragraph); // take the paragraph and append it to the list item for this note
			this.actions.className += 'actions'; // add the class '.actions' to the <ul> element in this note that holds the "like" and "remove" button
			this.likeButton.className += 'like icon-heart'; // add two classes to the like button. Checkout these classes in main.css
			this.removeButton.className += 'remove icon-cancel'; // add two classes to the remove button. Checkout these classes in main.css
			this.actions.appendChild(this.removeButton); // append the remove button to the ".actions" list
			this.actions.appendChild(this.likeButton); // append the like button to the ".actions" list
			this.listItem.appendChild(this.dateTime); // append the date & time (chris)
			this.listItem.appendChild(this.paragraph);  // append the paragraph to this note's list item
			this.listItem.appendChild(this.actions); // append the ".actions" <ul> element to the note.
			this.list.appendChild(this.listItem); // append the note to the notes list.
			this.attachEvents(); // run the function that looks out for all the events for THIS NOTE
			return this; // in the end, return the note object to us. 
		}

	}; // end note

	var notes = []; // the array to keep all the notes. we do notes.push(); at the top of the file.

	// the function that initializes our app. we will invoke it down there.
	var init = function() {
		console.log('App init'); // write some text to console.
		attachEvents(); // run the function that looks out for all the events for THE APP MODULE
	};

	// Of all the "vars" in our "app module", we are only making the following accessible to the world outsie:
	return {
		DOM : DOM, 
		attachEvents : attachEvents,
		init : init,
		notes : notes
	};


})(window, document); // we are passing "window" and "document" down here and aliasing them at the top. check it out.

window.addEventListener('DOMContentLoaded', app.init); // this is the equivalent of jQuery's document.ready. Wait dor all HTML elements to load and start our app.

