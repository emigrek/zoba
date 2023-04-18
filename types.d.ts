import { Link, Visit } from "@prisma/client";

export interface ExtendedLink extends Link {
    visits: Visit[]
}