// arrays are all passed by refrence!!!!!
// array1 = [...array2] everywhere!!!
// or retructure code

var Genetics = {
  $: {
    GenerateFakeData: function (NumberOfSamples) {
      var FakeData = []
      var XYZ = []
      var BpmRest = 62
      var BpmMax = 190
      var Time = 0
      for (var i = 0; i < NumberOfSamples; i++) {
        XYZ = [-100 + Math.random() * 200, -100 + Math.random() * 200, -100 + Math.random() * 200]
        FakeData.push({
          id: 'TestSubject01',
          xyz: XYZ,
          bpm: (BpmRest + ((Math.abs(XYZ[0]) + Math.abs(XYZ[1]) + Math.abs(XYZ[2])) / 3) / 100 * (BpmMax - BpmRest)),
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
    test: function (Model, InputData) {
      var OutputData = []
      for (var i = 0; i < Object.keys(InputData).length; i++) {
        OutputData[i] = []
        OutputData[i].xyz = InputData[i].xyz
        OutputData[i].bpm = Model[0] + (Math.abs(InputData[i].xyz[0]) + Math.abs(InputData[i].xyz[1]) + Math.abs(InputData[i].xyz[2])) / Model[1] / Model[2] * (Model[3] - Model[4])
      }
      return OutputData
    },
    fitness: function (Model, TrainingData) {
      var TestResults = Genetics.$.test(Model, TrainingData)
      var score = 0
      for (var i = 0; i < TrainingData.length; i++) {
        score += Math.pow(TrainingData[i].bpm - TestResults[i].bpm, 2)
      };
      if (Object.is(score, NaN)) {
        score = 999999
      }
      return (score)
    }
  },
  Train: function (InputModel, pool, iterations, TrainingData) {
    // inputs are optional.
    // input = {V:, F:, A:,Score: }
    // pool defaults to 1000
    // iterations defaults to 10
    var parents = []
    var i = 0
    if (!TrainingData) {
      TrainingData = Genetics.$.GenerateFakeData(500)
    }
    if (!pool) {
      pool = 20
    };
    if (!iterations) {
      iterations = 2
    };
    if (!InputModel) {
      for (i = 0; i < pool; i++) {
        parents.push({
          Model: Genetics.$.getRandomModel()
        })
      }
    } else {
      parents.push(InputModel)
      for (i = 0; i < (pool / 2); i++) {
        parents.push({
          Model: Genetics.$.mutate(InputModel.Model)
        })
      }
      for (i = (pool / 2); i < pool; i++) {
        parents.push({
          Model: Genetics.$.getRandomModel()
        })
      }
    }
    for (i = 1; i < pool; i++) {
      parents[i].Score = (Genetics.$.fitness(parents[i].Model, TrainingData))
    }
    for (var n = 0; n < iterations; n++) {
      // sort on best score
      parents.sort(function (a, b) {
        return (a.Score - b.Score)
      })
      var childs = []
      for (i = 0; i < pool; i++) {
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
          Score: (Genetics.$.fitness(tempmodel, TrainingData))
        })
      }
      parents = []
      parents = childs
    }
    // find best score
    parents.sort(function (a, b) {
      return a.Score - b.Score
    })
    // for (var i = 0; i < parents.length; i++){
    //   console.log (parents[i].Score);
    // }
    var BestModel = parents[0]
    return BestModel
  },
  Query: function (Model, InputData) {
    return Genetics.$.test(Model.Model, InputData)
  }
}
