var Genetics = {
  $: {
    GenerateFakeData: function(Number_of_samples){
      var FakeData = [];
      var XYZ = [];
      var BPM_rest = 62;
      var BPM_max = 190;
      var Time = 0;
      for (i = 0; i < Number_of_samples; i++) {
        XYZ = [-100+Math.random()*200,-100+Math.random()*200,-100+Math.random()*200]
        FakeData.push({
          id:"TestSubject01",
          xyz: XYZ,
          bpm: (BPM_rest + ((Math.abs(XYZ[0]) + Math.abs(XYZ[2]) + Math.abs(XYZ[2]))/3)/100 * (BPM_max-BPM_rest)),
          t: Time + 100
        });
      }
      return FakeData;
    },                      
    crossover: function(parent1, parent2){
      var child = {}
      for (const key of Object.keys(parent1)) {
        if (Math.random()>0.5) {
          child[key] = parent1[key];
        }
        else {
          child[key] = parent2[key];
        }
      }
      return(child)
    },
    mutate: function (solution){
      for (const key of Object.keys(solution)) {
        if (Math.random()<0.3) {
          solution[key] = solution[key] * (-1 + Math.random()*1) + (-1 + Math.random()*1); 
        }
      }
      return(solution)
    },
    getRandomModel: function(){
      var Model = {};
      for (i = 0; i < 20; i++) {
        Model[i] = Math.random()*100;  
      }
      return Model
    },
    test: function(Model, input_data){
      var output_data = [];
      input_data.forEach(function(item){
        output_data.push = item;
        output_data.bpm = (
          (output_data.xyz[0]*Model[0] + output_data.xyz[1]*Model[1] + output_data.xyz[2]*Model[2])/Model[3]*Model[4]
        ); 
      });
      return(output_data)
    },
    fitness: function(Model, training_data){
      var test_results = Genetics.$.test(Model, training_data);
      var score = 0;
      training_data.forEach(function(item){
        score = Math.pow(score,2) + Math.pow(Math.abs(training_data.bpm - test_results.bpm),2);
      });
      return(score)
    }
  },
  Train: function(Input_Model, pool, iterations, training_data){
    //inputs are optional. 
  //input = {V:, F:, A:,Score: }
  //pool defaults to 1000
  //iterations defaults to 10
  var parents = [];
  var childs = [];
  var score = [];
  if(!training_data){
    training_data = Genetics.$.GenerateFakeData(500);
  }
  if (!pool) {
    pool = 1000;
  };
  if (!iterations) {
    iterations = 10;
  };
  if(!Input_Model){
    for (i = 0; i < pool; i++) {
      tempmodel = Genetics.$.getRandomModel()
      parents[i] = {
        Model: tempmodel,
        Score: Genetics.$.fitness(tempmodel, training_data)
      };
    } 
  } else {
    for (i = 0; i < pool; i++) {
      tempmodel = Genetics.$.mutate(Input_Model.Model)
      parents[i] = {
        Model: tempmodel,
        Score: Genetics.$.fitness(tempmodel, training_data)
      };
    } 
  }
  Console.log(parents);
  for (n = 0; n <iterations; n++){
    //sort on best score
    parents.sort(function(a,b){
      return a.Score-b.Score;
    })
    for (i = 0; i < pool; i++) {
      childs[i] = {};
      childs[i].Model = Genetics.$.crossover(parents[Math.round(Math.random()*(pool/4),1)].Model, parents[Math.round(Math.random()*(pool/4),1)].Model); 
      childs[i].Model = Genetics.$.mutate(childs[i].Model);
      childs[i].Score = Genetics.$.fitness(childs[i].Model, training_data);
    } 
    parents = childs;
  }
  //find best score
  parents.sort(function(a,b){
    return a.Score-b.Score;
  })
  var Best_Model = parents[0];
  return Best_Model;
  },
  Query: function(Model, input_data){
    return Genetics.$.test(Model.Model,input_data);
  }
};
