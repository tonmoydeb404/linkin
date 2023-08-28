import { Model } from "mongoose";
import Layout from "./Layout";
import Link from "./Link";
import Profile from "./Profile";
import Social from "./Social";
import User from "./User";

const models: Model<any>[] = [User, Profile, Layout, Link, Social];

export default models;
