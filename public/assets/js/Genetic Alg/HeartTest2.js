var Genetics = {
  $: {
    crossover: function(parent1, parent2){
      var child = {}
      if (Math.random()>0.5) {
        child.V = parent1.V
      }
      else {
        child.V = parent2.V
      }
      if (Math.random()>0.5) {
        child.F = parent1.F
      }
      else {
        child.F = parent2.F
      }
      if (Math.random()>0.5) {
        child.A = parent1.A
      }
      else {
        child.A = parent2.A
      }
      child.V = Math.min(Math.max(child.V, 0.22),0.32)
      child.F = Math.min(Math.max(child.F, 0.4),1.6)
      child.A = Math.min(Math.max(child.A, 0.05),0.35)
      return(child)
    },
    mutate: function (solution){
      if (Math.random()<0.3) {
        solution.V = 0.22+Math.random()*0.1 //0.22 - 0.32L, 0.280L target
      }
      if (Math.random()<0.3) {
        solution.F = 0.4+Math.random()*1.6 //0.4 - 1.6Hz, 1Hz target
      }
      if (Math.random()<0.3) {
        solution.A = 0.05+Math.random()*0.3 //5% - 35%, 25% target
      }
      return(solution)
    },
    getRandomSolution: function(){
      var solution = {
        V: 0.22+Math.random()*0.1, 
        F: 0.4+Math.random()*1.6, 
        A: 0.05+Math.random()*0.3  
      }
      return solution
    },
    fitness: function(solution,target){
      var targetflow = target;
      var actualflow = solution.V*solution.F*solution.A;
      return(Math.abs(actualflow-targetflow))
    }
  },
  Train: function(input, pool, iterations, target){
    //inputs are optional. 
  //input = {V:, F:, A:,Score: }
  //pool defaults to 1000
  //iterations defaults to 10
  var parents = [];
  var childs = [];
  var score = [];
  if(!target){
    target = 0.28*1*.25;
  }
  if (!pool) {
    pool = 1000;
  };
  if (!iterations) {
    iterations = 10;
  };
  if(!input){
    for (i = 0; i < pool; i++) {
      parents.push(Genetics.$.getRandomSolution());
      parents[i].Score = fitness(parents[i], target);
    } 
  } else {
    for (i = 0; i < pool; i++) {
      parents.push(Genetics.$.mutate(input));
      parents[i].Score = Genetics.$.fitness(parents[i], target);
    } 
  }
  for (n = 0; n <iterations; n++){
    //sort on best score
    parents.sort(function(a,b){
      return a.Score-b.Score;
    })
    for (i = 0; i < pool; i++) {
      childs[i] = {};
      childs[i] = Genetics.$.crossover(parents[Math.round(Math.random()*(pool/4),1)], parents[Math.round(Math.random()*(pool/4),1)]); 
      childs[i] = Genetics.$.mutate(childs[i]);
      childs[i].Score = Genetics.$.fitness(childs[i], target);
    } 
    parents = childs;
  }
  //find best score
  parents.sort(function(a,b){
    return a.Score-b.Score;
  })
  return parents[0];
  },
  Query: function(input){

  }
};
