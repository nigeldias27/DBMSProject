import { useEffect } from "react";
import { Chart } from "chart.js";
function Graph() {
  useEffect(() => {
    var ctx = document.getElementById("myChart").getContext("2d");
    var data = [
      {
        disease: "viral_fever",
        no_of_cases: 100,
        City: "Bangalore",
        priority: 2,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "covid",
        no_of_cases: 18,
        City: "Banaglore",
        priority: 1,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "maleria",
        no_of_cases: 30,
        City: "Bangalore",
        priority: 2,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "chicken pokes",
        no_of_cases: 25,
        City: "Bangalore",
        priority: 1,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "tb",
        no_of_cases: 10,
        City: "Bangalore",
        priority: 1,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "small pox",
        no_of_cases: 5,
        City: "Bangalore",
        priority: 1,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "common cold",
        no_of_cases: 50,
        City: "Bangalore",
        priority: 3,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "AIDS",
        no_of_cases: 1,
        City: "Bangalore",
        priority: 1,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "Amebiasis",
        no_of_cases: 10,
        City: "Bangalore",
        priority: 2,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "Campylobacteriosis",
        no_of_cases: 2,
        City: "Bangalore",
        priority: 2,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "Conjunctivitis(Pink eye)",
        no_of_cases: 8,
        City: "Bangalore",
        priority: 1,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "Cozsackie Virus",
        no_of_cases: 3,
        City: "Bangalore",
        priority: 2,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "Crytosporidiosis",
        no_of_cases: 2,
        City: "Bangalore",
        priority: 2,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "Cytomegalovirus",
        no_of_cases: 7,
        City: "Bangalore",
        priority: 3,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "Diarrhea",
        no_of_cases: 20,
        City: "Bangalore",
        priority: 2,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "Escherichia coli",
        no_of_cases: 15,
        City: "Bangalore",
        priority: 3,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "fever",
        no_of_cases: 75,
        City: "Bangalore",
        priority: 3,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "Human Parvovirus",
        no_of_cases: 15,
        City: "Bangalore",
        priority: 2,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "Gastroenteritis",
        no_of_cases: 10,
        City: "Bangalore",
        priority: 2,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "Giardasis",
        no_of_cases: 13,
        City: "Bangalore",
        priority: 2,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "Head Lice",
        no_of_cases: 17,
        City: "Bangalore",
        priority: 2,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "Heapatitis A",
        no_of_cases: 17,
        City: "Bangalore",
        priority: 2,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "Hepatitis B",
        no_of_cases: 20,
        City: "Bangalore",
        priority: 3,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "Herpes Simplex",
        no_of_cases: 25,
        City: "Bangalore",
        priority: 3,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "Impetigo",
        no_of_cases: 35,
        City: "Bangalore",
        priority: 3,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "Infections",
        no_of_cases: 80,
        City: "Bangalore",
        priority: 3,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "Influenza",
        no_of_cases: 16,
        City: "Bangalore",
        priority: 3,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "Measles",
        no_of_cases: 20,
        City: "Bangalore",
        priority: 3,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "Meningitis(Bacterial)",
        no_of_cases: 12,
        City: "Bangalore",
        priority: 3,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "Meningitis(Viral)",
        no_of_cases: 17,
        City: "Bangalore",
        priority: 3,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "Meningococcal Infection",
        no_of_cases: 35,
        City: "Bangalore",
        priority: 2,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "Epstein Barr Virus",
        no_of_cases: 30,
        City: "Bangalore",
        priority: 2,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "Mumps",
        no_of_cases: 28,
        City: "Bangalore",
        priority: 3,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "Otitis Media",
        no_of_cases: 42,
        City: "Bangalore",
        priority: 2,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "Whooping Cough",
        no_of_cases: 23,
        City: "Bangalore",
        priority: 3,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "Sore Throat",
        no_of_cases: 60,
        City: "Bangalore",
        priority: 3,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "Pinworms",
        no_of_cases: 46,
        City: "Bangalore",
        priority: 2,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "Ringworm",
        no_of_cases: 40,
        City: "Bangalore",
        priority: 2,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "Repiratorty Syncytial Virus",
        no_of_cases: 7,
        City: "Bangalore",
        priority: 2,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "Rubella",
        no_of_cases: 66,
        City: "Bangalore",
        priority: 2,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "Salmonellosis",
        no_of_cases: 57,
        City: "Bangalore",
        priority: 2,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "Scabies",
        no_of_cases: 27,
        City: "Bangalore",
        priority: 2,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "Shigellosis",
        no_of_cases: 19,
        City: "Bangalore",
        priority: 3,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "Shingles",
        no_of_cases: 52,
        City: "Bangalore",
        priority: 3,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "Sinus Infection",
        no_of_cases: 100,
        City: "Bangalore",
        priority: 2,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
      {
        disease: "Typhoid Fever",
        no_of_cases: 17,
        City: "Bangalore",
        priority: 3,
        link: "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf",
      },
    ];
    var top = [];
    var color = [];
    for (var i = 0; i < data.length; i++) {
      var max = 0;
      for (var j = 0; j < data.length; j++) {
        if (data[j].no_of_cases > data[max].no_of_cases) {
          max = j;
        }
      }
      top.push(data[max]);
      data.splice(max, 1);
    }
    console.log(top);
    var myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: top.slice(0, 5).map((row) => row.disease),
        datasets: [
          {
            label: "no_of_cases",
            borderColor: top.slice(0, 5).map((row) => {
              return row.priority == 1
                ? "rgb(243,232,255)"
                : row.priority == 2
                ? "rgb(233,213,255)"
                : "rgb(192,132,252)";
            }),
            backgroundColor: top.slice(0, 5).map((row) => {
              return row.priority == 1
                ? "rgb(243,232,255)"
                : row.priority == 2
                ? "rgb(233,213,255)"
                : "rgb(192,132,252)";
            }),
            borderWidth: 1,
            data: top.slice(0, 5).map((row) => row.no_of_cases),
          },
        ],
      },
      options: {
        responsive: true,
        onClick: (e) => {
          console.log(e);
          window.location.href =
            "https://www.dshs.texas.gov/sites/default/files/schoolhealth/docs/Communicable%20Disease%20Chart-Schools%20and%20Childcare%20Centers-072922.pdf";
        },
      },
    });
  }, []);

  return (
    <>
      {/* Bar chart */}
      <div className="w-[1100px] h-screen flex mx-auto my-auto">
        <div className="border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl">
          <canvas id="myChart"></canvas>
        </div>
      </div>
    </>
  );
}

export default Graph;
