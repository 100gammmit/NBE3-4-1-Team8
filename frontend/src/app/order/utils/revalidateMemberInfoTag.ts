'use server';

import { revalidateTag } from "next/cache";
import { memberInfoTag } from "./orderApi";

const revalidateMemberInfoTag = () => {
    revalidateTag(memberInfoTag);
}

export default revalidateMemberInfoTag;