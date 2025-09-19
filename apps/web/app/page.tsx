/* eslint-disable @typescript-eslint/no-unused-vars */

import Dashboard from './dashboard/page';
import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";

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
                <h1 className="text-3xl font-bold text-gray-800">
                    Welcome back, Student
                    <div className="text-sm text-gray-500">Here&apos;s your learning dashboard</div>
                    <Dashboard />
                </h1>
            </div>
        </div>
    );
}