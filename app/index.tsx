import { FlatList, View } from "react-native";
import axios from 'axios';
import { useState } from "react";
import { PostCard } from "@/components/PostCard";

export default function Index() {
  const [data, setData] = useState([]);

  axios.get("http://localhost:3000/posts").then(response => {
    setData(response.data)
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlatList
        data={data}
        renderItem={({ item }) => <PostCard post={item} />}
      />
    </View>
  );
}