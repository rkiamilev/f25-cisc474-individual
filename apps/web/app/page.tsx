/* eslint-disable @typescript-eslint/no-unused-vars */

import Navbar from "@/components/navbar";
import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import Link from "next/link";

type Props = Omit<ImageProps, "src"> & {
    srcLight: string;
    srcDark: string;
};

const ThemeImage = (props: Props) => {
    const { srcLight, srcDark, ...rest } = props;

    return (
        <>
            <Image {...rest} src={srcLight} className="imgLight" />
            <Image {...rest} src={srcDark} className="imgDark" />
        </>
    );
};

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Home Page</h1>
                <div className="text-sm text-gray-500">Welcome to your dashboard</div>
                <h1 className="text-3xl font-bold text-gray-800">
                    <Link
                        href="/dashboard"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Go to Dashboard
                    </Link>
                </h1>
            </div>
        </div>
    );
}