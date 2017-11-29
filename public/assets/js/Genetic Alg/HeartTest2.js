// arrays are all passed by refrence!!!!!
// array1 = [...array2] everywhere!!!
// or retructure code

var Genetics = {
  $: {
    GenerateFakeData: function (Number_of_samples) {
      var FakeData = []
      var XYZ = []
      var BPM_rest = 62
      var BPM_max = 190
      var Time = 0
      for (var i = 0; i < Number_of_samples; i++) {
        XYZ = [-100 + Math.random() * 200, -100 + Math.random() * 200, -100 + Math.random() * 200]
        FakeData.push({
          id: 'TestSubject01',
          xyz: XYZ,
          bpm: (BPM_rest + ((Math.abs(XYZ[0]) + Math.abs(XYZ[1]) + Math.abs(XYZ[2])) / 3) / 100 * (BPM_max - BPM_rest)),
          t: Time
        })
        Time += 100
      }
      return (FakeData)
    },
    crossover: function (parent1, parent2) {
      var child = {}
      for (var i = 0; i < Object.keys(parent1).length; i++) {
        if (Math.random() > 0.5) {
          child[i] = parent1[i]
        } else {
          child[i] = parent2[i]
        }
      }
      return (child)
    },
    mutate: function (solution) {
      var output = []
      for (var i = 0; i < Object.keys(solution).length; i++) {
        output[i] = solution[i]
        if (Math.random() < 0.2) {
          output[i] = solution[i] * (Math.random() * 0.2 - 0.1)
        }
        if (Math.random() < 0.05) {
          output[i] = -200 + Math.random() * 400
        }
      }
      return (output)
    },
    getRandomModel: function () {
      var Model = {}
      for (var i = 0; i < 20; i++) {
        Model[i] = -200 + Math.random() * 400
      }
      return Model
    },
    test: function (Model, input_data) {
      var output_data = []
      for (var i = 0; i < Object.keys(input_data).length; i++) {
        output_data[i] = []
        output_data[i].xyz = input_data[i].xyz
        output_data[i].bpm = Model[0] + (Math.abs(input_data[i].xyz[0]) + Math.abs(input_data[i].xyz[1]) + Math.abs(input_data[i].xyz[2]))/Model[1]/Model[2]*(Model[3]-Model[4]) 
      }
      return output_data
    },
    fitness: function (Model, training_data) {
      var test_results = Genetics.$.test(Model, training_data)
      var score = 0
      for (var i = 0; i < training_data.length; i++) {
        score += Math.pow(training_data[i].bpm - test_results[i].bpm, 2)
      };
      if (Object.is(score, NaN)) {
        score = 999999
      }
      return (score)
    }
  },
  Train: function (Input_Model, pool, iterations, training_data) {
    // inputs are optional.
    // input = {V:, F:, A:,Score: }
    // pool defaults to 1000
    // iterations defaults to 10
    var parents = []
    if (!training_data) {
      training_data = Genetics.$.GenerateFakeData(500)
    }
    if (!pool) {
      pool = 20
    };
    if (!iterations) {
      iterations = 2
    };
    if (!Input_Model) {
      for (var i = 0; i < pool; i++) {
        parents.push({
          Model: Genetics.$.getRandomModel()
        })
      }
    } else {
      parents.push(Input_Model)
      for (var i = 0; i < (pool / 2); i++) {
        parents.push({
          Model: Genetics.$.mutate(Input_Model.Model)
        })
      }
      for (var i = (pool / 2); i < pool; i++) {
        parents.push({
          Model: Genetics.$.getRandomModel()
        })
      }
    }
    for (var i = 1; i < pool; i++) {
      parents[i].Score = (Genetics.$.fitness(parents[i].Model, training_data))
    }
    for (var n = 0; n < iterations; n++) {
      // sort on best score
      parents.sort(function (a, b) {
        return (a.Score - b.Score)
      })
      var childs = []
      for (var i = 0; i < pool; i++) {
        var tempmodel = []
        switch (Math.round(Math.random())) {
          case 0:
            tempmodel = Genetics.$.mutate(Genetics.$.crossover(parents[Math.round(Math.random() * (pool / 10))].Model, parents[Math.round(Math.random() * (pool / 10))].Model))
            break
          case 1:
            tempmodel = Genetics.$.mutate(parents[Math.round(Math.random() * (pool / 10))].Model)
            break
        }
        childs.push({
          Model: tempmodel,
          Score: (Genetics.$.fitness(tempmodel, training_data))
        })
      }
      parents = []
      parents = childs
    }
    //find best score
    parents.sort(function (a, b) {
      return a.Score - b.Score
    })
    // for (var i = 0; i < parents.length; i++){
    //   console.log (parents[i].Score);
    // }
    var Best_Model = parents[0]
    return Best_Model
  },
  Query: function (Model, input_data) {
    return Genetics.$.test(Model.Model, input_data)
  }
}
