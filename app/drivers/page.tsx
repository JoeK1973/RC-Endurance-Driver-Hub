"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { drivers, rounds } from "@/lib/sample";

function DriversContent() {
  const searchParams = useSearchParams();

  const [round, setRound] = useState(
    searchParams.get("round") || "r1"
  );

  const [experience, setExperience] = useState("All");

  const filteredDrivers = useMemo(() => {
    return drivers.filter(
      (driver) =>
        driver.status !== "affiliated" &&
        driver.rounds.includes(round) &&
        (experience === "All" ||
          driver.experience === experience)
    );
  }, [round, experience]);

  return (
    <div>
      <h1 className="text-3xl font-bold">
        Available Drivers
      </h1>

      <p className="muted mt-2">
        Only drivers currently open to joining a team are shown.
      </p>

      <div className="card p-4 mt-5 flex flex-wrap gap-3">

        <select
          value={round}
          onChange={(e) => setRound(e.target.value)}
          className="text-black p-2 rounded"
        >
          {rounds.map((roundItem) => (
            <option
              value={roundItem.id}
              key={roundItem.id}
            >
              {roundItem.name}
            </option>
          ))}
        </select>

        <select
          value={experience}
          onChange={(e) =>
            setExperience(e.target.value)
          }
          className="text-black p-2 rounded"
        >
          {[
            "All",
            "Intermediate",
            "Advanced",
            "Expert"
          ].map((level) => (
            <option key={level}>
              {level}
            </option>
          ))}
        </select>

      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-5">

        {filteredDrivers.map((driver) => (
          <article
            className="card p-5"
            key={driver.id}
          >
            <div className="flex justify-between">

              <h2 className="text-xl font-bold">
                {driver.name}
              </h2>

              <span>
                {driver.status === "reserve"
                  ? "🟡 Reserve"
                  : "🟢 Looking for team"}
              </span>

            </div>

            <p className="muted">
              {driver.club} · {driver.experience}
            </p>

            <p className="mt-3">
              {driver.classes.join(" · ")}
            </p>

            <p className="muted mt-3">
              {driver.notes}
            </p>

            <button
              className="btn mt-4"
              onClick={() =>
                alert(
                  `Contact request sent to ${driver.name} (demo mode).`
                )
              }
            >
              Contact driver
            </button>

          </article>
        ))}

      </div>

      {!filteredDrivers.length && (
        <p className="muted mt-8">
          No matching unaffiliated drivers for this round.
        </p>
      )}

    </div>
  );
}

export default function Drivers() {
  return (
    <Suspense
      fallback={
        <div className="card p-5">
          Loading available drivers...
        </div>
      }
    >
      <DriversContent />
    </Suspense>
  );
}
