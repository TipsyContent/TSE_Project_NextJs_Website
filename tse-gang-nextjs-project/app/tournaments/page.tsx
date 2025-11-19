"use client"

import * as React from "react";
import { fetchData } from "@/lib/fetchData";
import { formatTournamentDateTime } from "@/lib/utils/dateAndTimeFormatter";

type Item = {
        match: { id: string; url: string };
        event: { name: string; logo: string; };
        teams: { name: string; tag: string; logo: string }[];
        utc: string;
        date?: string;
        time?: string;
};

export default function TournamentsPage() {
    const [upcoming, setUpcoming] = React.useState<Item[]>([]);
    const [recent, setRecent] = React.useState<Item[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    

    return (
        <main>
        <div>
            <h1 className="text-2xl mb-4">Next three matches</h1>
            
        </div>
        <div>
            <h1 className="text-2xl mb-4">Recent three matches</h1>
        </div>
        </main>
    );
}