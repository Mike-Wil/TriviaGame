//'Totally Trivial Trivia!'
var quiz={
    qs: {
        quest0: {
            question: 'In the episode, "Suds", what type of plant is scrubbed with Patrick?', 
            ans0: {text:'Cactus',
                    isTrue: true},
            ans1: {text:'Bush',
                    isTrue: false},
            ans2: {text:'Rose',
                    isTrue: false},
            ans3: {text:'Tree',
                    isTrue: false}},
        quest1: {
            question: 'In the episode, "Graveyard Shift", which of these was NOT something that happened because the Hash-Slinging-Slasher came?', 
            ans0: {text:'The walls ooze green slime',
                    isTrue: true},
            ans1: {text:'The bus drops someone off across the road',
                    isTrue: false},
            ans2: {text:'The phone rings, but nobody is there',
                    isTrue: false},
            ans3: {text:'The lights flicker on and off',
                    isTrue: false}},
        quest2: {
            question: 'What color is SpongeBob\'s tie?', 
            ans0: {text:'Red',
                    isTrue: true},
            ans1: {text:'Blue',
                    isTrue: false},
            ans2: {text:'Brown',
                    isTrue: false},
            ans3: {text:'Green',
                    isTrue: false}},
        quest3: {
            question: 'What kind of house does Patrick live in?', 
            ans0: {text:'Rock',
                    isTrue: true},
            ans1: {text:'Pineapple',
                    isTrue: false},
            ans2: {text:'Tree Dome',
                    isTrue: false},
            ans3: {text:'Easter Island Head',
                    isTrue: false}},
        quest4: {
            question: 'Which one of these characters is the only one who wears shoes?', 
            ans0: {text:'SpongeBob',
                    isTrue: true},
            ans1: {text:'Patrick',
                    isTrue: false},
            ans2: {text:'Squidward',
                    isTrue: false},
            ans3: {text:'Mr. Krabs',
                    isTrue: false}},
        quest5: {
            question: 'In the episode, "Help Wanted", what invades the Krusty Krab and starts practically destroying the restaurant only to eventually be thwarted by SpongeBob?', 
            ans0: {text:'Anchovies',
                    isTrue: true},
            ans1: {text:'Salmon',
                    isTrue: false},
            ans2: {text:'Crabs',
                    isTrue: false},
            ans3: {text:'Starfish',
                    isTrue: false}},
        quest6: {
            question: 'What is the name of the beach where the fish in Bikini Bottom like to go?', 
            ans0: {text:'Goo Lagoon',
                    isTrue: true},
            ans1: {text:'Blue Lagoon',
                    isTrue: false},
            ans2: {text:'Bikini Bottom Beach',
                    isTrue: false},
            ans3: {text:'Short Sands',
                    isTrue: false}},
        quest7: {
            question: 'In the episode "Texas", how do SpongeBob and Patrick get Sandy to follow them to the Krusty Krab?', 
            ans0: {text:'By making fun of Texas',
                    isTrue: true},
            ans1: {text:'Threatening Wormy',
                    isTrue: false},
            ans2: {text:'They tied her up and carried her',
                    isTrue: false},
            ans3: {text:'Making a trail of Krabby Patties',
                    isTrue: false}},
        quest8: {
            question: 'In the episode "Neptune\'s Spatula", to whom does King Neptune proclaim, "You have the physique of Atlas!"?', 
            ans0: {text:'Larry the Lobster',
                    isTrue: true},
            ans1: {text:'Patrick Star',
                    isTrue: false},
            ans2: {text:'Spongebob Squarepants',
                    isTrue: false},
            ans3: {text:'Hot Dog Vendor',
                    isTrue: false}}, 
        quest9: {
            question: 'Who is Squidward\'s arch-rival whom he met in high school band class?', 
            ans0: {text:'Squilliam Fancyson',
                    isTrue: true},
            ans1: {text:'Spongebob',
                    isTrue: false},
            ans2: {text:'Patrick Star',
                    isTrue: false},
            ans3: {text:'Plankton',
                    isTrue: false}}
        },
    metrics: {
        numCorrect: 0,
        numWrong: 0,
        numBlank: 0
    }
                                               
}


$(document).ready(function() {
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        };
      
        return array;
      }
    
    //var randQs = function(x) {

    // //generate an array of length x
    //     var arr = [];
    //     while (x--) {
            
    //         arr[x] = x;
    //         console.log(arr, x);
    //     }
    // }
    
    function decrement() {
        time--;
        timer.html('<h2>Time Remaining: '+time+ ' seconds</h2>');
    }
    var quizKeys = Object.keys(quiz.qs);
    //var orderQs = randQs(quizKeys.length);
    console.log(quizKeys);
    var randAns = [0, 1, 2, 3];
    var qNum=0;
    var title=$('#title');
    var timer=$('#timer');
    var question=$('#question');
    var ans=$('#ans');
    var qMets = quiz.metrics;
    var intervalId;
    var time=30;
    var leftBlank;
    var currQuest;
    var logo = $('<img>');
    logo.attr('src','assets/images/SpongeLogo.svg');

    logo.attr('id','logo');


    title.append(logo);
    var startBtn = $('<button>');
    startBtn.attr('id','startBtn');
    startBtn.text('Start!');
    startBtn.attr('class','btn btn-secondary');
    ans.append(startBtn);

    function checkpoint(response) {
        setTimeout(onward,3000);
                   
        clearInterval(intervalId);
        timer.empty();
        question.empty();
        ans.empty();
        console.log(currQuest);
        ans.append('<h1>'+response+'</h1>');
        if (response != 'Correct!') {
            ans.append('<h2>The correct Answer was: '+currQuest.ans0.text+'</h2>');
        }
        if (response === 'You ran out of time!') {
            qMets.numBlank++;
        }

    }
    function onward() {

        if (qNum<quizKeys.length) {
            // console.log(this);
            time=30;
            timer.html('<h2>Time Remaining: '+time+' seconds</h2>');
            clearInterval(intervalId);
            intervalId = setInterval(decrement,1000);
            leftBlank = setTimeout(checkpoint,5000,'You ran out of time!');
            
            console.log(qMets.numCorrect);
            console.log(qMets.numWrong);
            currQuest = quiz.qs[quizKeys[qNum]];
            var currQ = $('<div>'+currQuest.question+'</div>');
            currQ.attr('id','currQ');
            
            // console.log(quiz.qs[quizKeys[qNum]]);  
            // console.log(quizKeys[qNum]);
            qNum++;
            question.empty();
            ans.empty();

            question.append(currQ);
            randAns=shuffle(randAns);
            // console.log(randAns);
            for (var i=0;i<randAns.length;i++) {
                var responseDiv = $('<div>');
                responseDiv.attr('class','ans'+randAns[i]+' btn btn-primary');
                responseDiv.attr('value',currQuest['ans'+randAns[i]].isTrue);
                //console.log(responseDiv.attr('value'));
                responseDiv.html(currQuest['ans'+randAns[i]].text);
                ans.append(responseDiv);
            }
        }
        else {

            clearInterval(intervalId);
            timer.empty();
            question.empty();
            ans.empty();
            var scoreDiv = $('<div>');
            
            scoreDiv.html('<h1>Finished! Here\'s how you did.</h1> <h2>Correct Answers: '+qMets.numCorrect+ '</h2><h2>Incorrect Answers: '+qMets.numWrong+'</h2><h2>Unanswered: '+qMets.numBlank+'</h2>');
            scoreDiv.attr('id','scoring');
            question.append(scoreDiv);
            startBtn.text('Start Over?');
            ans.append(startBtn);

        }
    }

    $(document).on('click', '.btn', function() {
        //console.log( typeof $(this).attr('value'));        
        
        clearTimeout(leftBlank);
        if ($(this).attr('value')==='true') {
            console.log('yes');
            qMets.numCorrect++;
            checkpoint('Correct!');

        }
        else if ($(this).attr('value')==='false') {
            qMets.numWrong++;
            checkpoint('Wrong.');
        }
        if ($(this).is('#startBtn')) {
            qNum=0;
            qMets.numCorrect=0;
            qMets.numWrong=0;
            qMets.numBlank=0;
            time=30;
            
            quizKeys = shuffle(quizKeys);
            onward();
        }
        //onward();
        
    });



});