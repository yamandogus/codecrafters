import { CommentsGallery, CommentsGalleryProps } from "./gallery";

const demoData: CommentsGalleryProps = {
  items: [
    {
      id: "comment-1",
      author: "Ahmet Yılmaz",
      content: "Harika bir deneyimdi! Çok memnun kaldım ve kesinlikle tavsiye ederim. Hizmet kalitesi gerçekten üst düzey.",
      rating: 5,
      date: "2024-01-15",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjN8fHx8fHwyfHwxNzIzODA2OTM5fA&ixlib=rb-4.0.3&q=80&w=1080",
    },
    {
      id: "comment-2",
      author: "Ayşe Demir",
      content: "Çok profesyonel bir yaklaşım ve kaliteli sonuçlar. Beklentilerimin üzerinde bir hizmet aldım.",
      rating: 5,
      date: "2024-01-12",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjR8fHx8fHwyfHwxNzIzODA2OTM5fA&ixlib=rb-4.0.3&q=80&w=1080",
    },
    {
      id: "comment-3",
      author: "Mehmet Kaya",
      content: "Zamanında teslim ve kaliteli iş. İletişim sürecinde de çok yardımcı oldular. Teşekkürler!",
      rating: 4,
      date: "2024-01-10",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxNzd8fHx8fHwyfHwxNzIzNjM0NDc0fA&ixlib=rb-4.0.3&q=80&w=1080",
    },
    {
      id: "comment-4",
      author: "Fatma Özkan",
      content: "Mükemmel bir deneyim! Çok sabırlı ve anlayışlı bir ekip. Sonuçtan çok memnunum.",
      rating: 5,
      date: "2024-01-08",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMzF8fHx8fHwyfHwxNzIzNDM1MzA1fA&ixlib=rb-4.0.3&q=80&w=1080",
    },
    {
      id: "comment-5",
      author: "Ali Çelik",
      content: "Profesyonel yaklaşım ve kaliteli hizmet. Fiyat-performans açısından da çok uygun.",
      rating: 4,
      date: "2024-01-05",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjV8fHx8fHwyfHwxNzIzNDM1Mjk4fA&ixlib=rb-4.0.3&q=80&w=1080",
    },
  ],
};

function Comments() {
  return <CommentsGallery {...demoData} />;
}

export { Comments };
