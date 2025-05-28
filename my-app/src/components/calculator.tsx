import { useEffect, useState } from "react";

export default function Calculator() {
  const [loanType, setloanType] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [term, setTerm] = useState("");
  const [credit, setCredit] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      loanType,
      loanAmount: Number(loanAmount),
      term: Number(term),
      creditScore: credit,
      houseAge: Number(age),
    };
    console.log("Payload being sent to API:", payload); 
    try {
    const response = await fetch("https://home-loan.matthayward.workers.dev/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const result = await response.json();
    console.log("API response:", result);
    // Optionally show a success message or navigate
  } catch (error) {
    console.error("Submission error:", error);
    // Optionally show an error message to the user
  }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setloanType(e.target.value);
  };

  const handleCredit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCredit(e.target.value);
  };

  const handleTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const num = Number(val);



    if (val === "") {
      setTerm(val);
      return;
    }
    
    setTerm(val)

    if (loanType === "Fixed Rate" || loanType === "Variable Rate") {
      // term must be between 1 and 30
      if (num >= 1 && num <= 30) {
        setTerm(val);
      }
    } else if (loanType === "Interest Only") {
      // term must be between 1 and 10
      if (num >= 1 && num <= 10) {
        setTerm(val);
      }
    }
  };
  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    // Allow empty input (user deleting)
    if (val === "") {
      setLoanAmount(val);
      return;
    }
    const num = Number(val);
    if (!isNaN(num) && num >= 0) {
      setLoanAmount(val);
    }
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const x = e.target.value;

    // Allow empty input (user deleting)
    if (x === "") {
      setAge(x);
      return;
    }

    const num = Number(x);
    if (!isNaN(num) && num >= 0) {
      setAge(x);
    }
  };

  return (
    <div className=" mt-4">
      <p className=" flex justify-center">Calculator</p>
      <form
        onSubmit={handleSubmit}
        className="border-4 flex flex-col gap-4 max-w-lg w-full p-4 mx-auto"
      >
        {/* Two-column layout inside a row */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-4 w-1/2">
            <label className="flex items-center gap-2">
              <select
                name="loanType"
                value={loanType}
                onChange={handleChange}
                className="border p-2"
                required
              >
                <option value="">Select loan type</option>
                <option value="Fixed Rate">Fixed Rate</option>
                <option value="Variable Rate">Variable Rate</option>
                <option value="Interest Only">Interest Only</option>
              </select>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="number"
                name="loanAmount"
                placeholder="Loan Amount"
                value={loanAmount}
                required
                onChange={handleLoanAmountChange}
              />
            </label>
          </div>

          <div className="flex flex-col gap-4 w-1/2">
            <label className="flex items-center gap-2">
              <input
                type="number"
                name="term"
                placeholder="Loan term in years"
                value={term}
                onChange={handleTermChange}
                required
                className="border p-2"
              />
            </label>

            <label className="flex items-center gap-2">
              <select
                name="credit"
                value={credit}
                onChange={handleCredit}
                className="border p-2"
                required
              >
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
              </select>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="number"
                name="age"
                value={age}
                placeholder="House Age"
                required
                onChange={handleAgeChange}
              />
            </label>
          </div>
        </div>

        {/* Submit button */}
        <div className="w-full px-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Calculate
          </button>
        </div>
      </form>
    </div>
  );
}
